import { Request, Response } from "express"
import {
    CreateProductInput,
    UpdateProductInput,
} from "../schema/product.schema"
import {
    createProduct,
    deleteProduct,
    findAllProduct,
    findAndUpdateProduct,
    findProduct,
} from "../service/product.service"

export const createProductHandler = async (
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response
) => {
    const body = req.body
    const product = await createProduct({
        ...body,
        user: undefined
    })

    return res.send(product)
}

export const updateProductHandler = async (
    req: Request<UpdateProductInput["params"]>,
    res: Response
) => {
    const productId = req.params.productId
    const update = req.body
    const product = await findProduct({ productId })

    if (!product) {
    return res.sendStatus(404)
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
})

    return res.send(updatedProduct)
}

export const getAllProductHandler = async (
    req: Request<UpdateProductInput["params"]>,
    res: Response
) => {
    const productId = req.params.productId
    const product = await findAllProduct()
    

    if (!product) {
        return res.sendStatus(404)
    }

    return res.send(product)
}

export const getProductHandler = async (
    req: Request<UpdateProductInput["params"]>,
    res: Response
) => {
    const productId = req.params.productId
    const product = await findProduct({ productId })
    

    if (!product) {
        return res.sendStatus(404)
    }

    return res.send(product)
}

export const deleteProductHandler = async (
    req: Request<UpdateProductInput["params"]>,
    res: Response
) => {
    const productId = req.params.productId
    const product = await findProduct({ productId })

    if (!product) {
        return res.sendStatus(404)
    }

    await deleteProduct({ productId })

    return res.sendStatus(200)
}