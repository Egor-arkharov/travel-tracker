"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm } from "@/store/slices/travelFormSlice";
// import { uploadToFirebase } from "@/utils/firebaseUpload"; // псевдофункция

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.travelForm);

  const handleSubmit = async () => {
    try {
      console.log("📦 Отправляем в Firebase:", form);

      // 🔥 Тут будет отправка в Firebase
      // await uploadToFirebase(form);

      dispatch(resetForm());
      alert("Форма отправлена!");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Что-то пошло не так 😢");
    }
  };

  return (
    <button onClick={handleSubmit} type="button">
      Submit
    </button>
  );
};

export default SubmitButton;
