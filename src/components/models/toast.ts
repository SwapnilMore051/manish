export type ToastState = {
  type: ToastTypes;
  message: string;
};

export const ToastTypes = {
  Success: "success",
  Error: "error",
} as const;

export type ToastTypes = (typeof ToastTypes)[keyof typeof ToastTypes];

export type ToastContextType = {
  toast: ToastState | null;
  showToast: (value: ToastState) => void;
  removeToast: () => void;
};

export type ToastRefType = {
  showToast: (value: ToastState) => void;
  removeToast: () => void;
  getToast: () => ToastState | null;
};

type ToastConstDataType = {
  img: string;
  color: string;
};

export const toastData: {
  [ToastTypes.Success]: ToastConstDataType;
  [ToastTypes.Error]: ToastConstDataType;
} = {
  [ToastTypes.Success]: {
    img: "/icons/ic_check_colored.svg",
    color: "#6ea734",
  },
  [ToastTypes.Error]: {
    img: "/icons/ic_error_colored.svg",
    color: "#6ea734",
  },
};
