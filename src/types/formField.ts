export type FieldRef = {
  validate: () => boolean;
  reset?: () => void;
};
