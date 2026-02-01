import { Request, Response } from "express";
import { createStoreWithAdmin, getAllStores, getStoreById } from "../services/store.service";




export const registerStore = async( req: Request, res: Response ) => {
    const { admin, store } = req.body;

    const { firstName, lastName, phone, password } = admin;
    const { name } = store;

    const newStore = await createStoreWithAdmin({ name }, { firstName, lastName, phone, password });

    res.status(201).json({
        message: "Store created successfully",
        success: true,
        store: newStore
    })
}



export const getStores = async( req: Request, res: Response ) => {
    const stores = await getAllStores();
    res.status(200).json({
        message: "Stores retrieved successfully",
        success: true,
        stores
    });
}



export const getStore = async( req: Request, res: Response ) => {
    const id  = req.params.id as string;
    const store = await getStoreById(id);
    if (!store) {
        return res.status(404).json({
            message: "Store not found",
            success: false
        });
    }
    res.status(200).json({
        message: "Store retrieved successfully",
        success: true,
        store
    });
}