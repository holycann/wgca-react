import { toast } from 'react-toastify';

export const ToastConfirm = (id, func) => {
    toast.info(
        <div>
            <p>Are You Sure?</p>
            <div className="flex justify-between p-2">
                <button
                    className="bg-red-500 text-white px-2 py-1 rounded-full flex items-center"
                    onClick={() => {
                        func(id);
                        toast.dismiss();
                    }}
                >
                    Confirm
                </button>
                <button
                    className="bg-green-500 text-white px-2 py-1 ml-2 rounded-full flex items-center"
                    onClick={() => toast.dismiss()}
                >
                    Cancel
                </button>
            </div>
        </div>,
        {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        }
    );
};

export const ToastSuccess = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}


export const ToastError = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
