import create from "zustand";

export const useWalletStore = create((set) => (
    {
        walletAddress: null,
        updateWalletAddress: (value) => {
            set({ walletAddress: value });
        },

        connectStatus: false,
        updateConnectStatus: (value) => {
            set({connectStatus: value});
        },
    }
));
