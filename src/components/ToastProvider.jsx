"use client";

import { Toaster, toast } from "react-hot-toast";

// Export a reusable function for triggering toast anywhere
export const showToast = (message, type = "success") => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else toast(message);
};

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "16px 20px",
                    borderRadius: "10px",
                },
                success: {
                    style: {
                        background: "#DBF6E5",
                        color: "#007B5E",
                        borderLeft: "5px solid #00A76F",
                    },
                    iconTheme: { primary: "#00A76F", secondary: "#FFFFFF" },
                },
                error: {
                    style: {
                        background: "#FFEBEE",
                        color: "#C62828",
                        borderLeft: "5px solid #D32F2F",
                    },
                    iconTheme: { primary: "#D32F2F", secondary: "#FFFFFF" },
                },
                loading: {
                    style: {
                        background: "#E3F2FD",
                        color: "#1565C0",
                        borderLeft: "5px solid #2196F3",
                    },
                },
            }}
        />
    );
}
