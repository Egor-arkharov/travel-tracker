import { Travel } from "@/types/travel";

// ---------- Шаблон раскладки для большого экрана ----------
export function getLargeScreenPattern(totalItems: number): number[] {
	// Для первых случаев — хардкодим оптимальные варианты
	if (totalItems <= 0) return [];
	if (totalItems === 1) return [1];
	if (totalItems === 2) return [2];
	if (totalItems === 3) return [3];
	if (totalItems === 4) return [4];
	if (totalItems === 5) return [3, 2];
	if (totalItems === 6) return [3, 3];
	if (totalItems === 7) return [4, 3];

	// Далее — динамически разбиваем на блоки с приоритетом 4
	const blocks: number[] = [];
	let remainingItems = totalItems;

	while (remainingItems > 0) {
		if (remainingItems >= 4) {
			// Специальные случаи для красивой разбивки
			if (remainingItems === 5) {
				blocks.push(3, 2);
				break;
			} else if (remainingItems === 6 && blocks.some((b) => b === 4)) {
				blocks.push(3, 3);
				break;
			} else if (remainingItems === 2 || remainingItems === 3) {
				blocks.push(remainingItems);
				break;
			} else if (remainingItems - 4 === 1) {
				blocks.push(3, remainingItems - 3);
				break;
			} else {
				blocks.push(4);
				remainingItems -= 4;
			}
		} else {
			blocks.push(remainingItems);
			break;
		}
	}

	return blocks;
}

// ---------- Шаблон раскладки для среднего экрана (мобильный, но не самый маленький) ----------
export function getMediumScreenPattern(totalItems: number): number[] {
	if (totalItems <= 0) return [];
	if (totalItems === 1) return [1];
	if (totalItems === 2) return [2];
	if (totalItems === 4) return [2, 2];

	const blocks: number[] = [];
	let remainingItems = totalItems;

	while (remainingItems > 0) {
		if (remainingItems >= 3) {
			if (remainingItems === 4) {
				blocks.push(2, 2);
				break;
			} else {
				blocks.push(3);
				remainingItems -= 3;
			}
		} else {
			blocks.push(remainingItems);
			break;
		}
	}

	return blocks;
}

// ---------- Выбор подходящего шаблона раскладки в зависимости от ширины экрана ----------
export const resolveGridPattern = (
	totalItems: number,
	windowWidth: number
): { blockSizes: number[]; suffix: string } => {
	if (windowWidth <= 900) {
		// Средние экраны — мобильная версия сетки
		return {
			blockSizes: getMediumScreenPattern(totalItems),
			suffix: "sm",
		};
	}

	// Десктоп
	return {
		blockSizes: getLargeScreenPattern(totalItems),
		suffix: "",
	};
};

// ---------- Присваивает каждой карточке нужный CSS-класс по позиции в блоке ----------
export const applyGridClassesToTravels = (
	travelsToStyle: Travel[],
	blockSizes: number[],
	screenSizeSuffix: string,
	cssStyles: Record<string, string>
) => {
	// Если карточек или блоков нет — просто отдаем базовый класс
	if (travelsToStyle.length === 0 || blockSizes.length === 0) {
		return travelsToStyle.map((travel) => ({
			...travel,
			gridItemClassName: cssStyles.cardItem,
		}));
	}

	let itemIndex = 0;
	let logicalBlockNumber = 0;
	const styledTravels = [];
	const totalItems = travelsToStyle.length;

	for (const blockSize of blockSizes) {
		logicalBlockNumber++;

		// Чередуем "обычный" и "зеркальный" блок
		const isMirrored = logicalBlockNumber % 2 === 0;
		const blockType = `block-type-${blockSize}${screenSizeSuffix ? `-${screenSizeSuffix}` : ""}-${isMirrored ? "mirrored" : "normal"}`;

		for (let posInBlock = 1; posInBlock <= blockSize; posInBlock++) {
			if (itemIndex < totalItems) {
				// Формируем ключ и собираем итоговый CSS-класс
				const travel = travelsToStyle[itemIndex];
				const itemSpecificClassKey = `${blockType}-pos-${posInBlock}`;
				const itemClassName = `${cssStyles.cardItem} ${cssStyles[itemSpecificClassKey] || ""}`;

				styledTravels.push({
					...travel,
					gridItemClassName: itemClassName,
				});

				itemIndex++;
			} else {
				break;
			}
		}

		if (itemIndex >= totalItems) break;
	}

	return styledTravels;
};
