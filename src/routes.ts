import { Express, Request, Response } from "express"
import {
    createProductHandler,
    getProductHandler,
    updateProductHandler,
    deleteProductHandler,
    getAllProductHandler,
} from "./controller/product.controller";

const routes = (app: Express) => {
    app.get("/test", (req: Request, res: Response) => res.sendStatus(200))
    /* ============================== product ============================== */
    app.get(
        "/api/products/",
        getAllProductHandler
    )
    app.get(
        "/api/products/:productId",
        getProductHandler
    )
    app.post(
        "/api/products",
        createProductHandler
    )
    app.put(
        "/api/products/:productId",
        updateProductHandler
    )
    app.delete(
        "/api/products/:productId",
        deleteProductHandler
    )
    /* ============================== product ============================== */
}

export default routes