import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
  
export default function Dashboard(props) {
  
    const { data, setData, errors, post } = useForm({
        product_name: "",
        sku: "",
        price: "",
        description: "",
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("products.store"));
    }
  
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Products</h2>}
        >
            <Head title="Products" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("products.index") }
                                >
                                    Back
                                </Link>
                            </div>
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Product Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Product Name"
                                            name="product_name"
                                            value={data.product_name}
                                            onChange={(e) =>
                                                setData("product_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.product_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Sku</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Sku"
                                            name="sku"
                                            value={data.sku}
                                            onChange={(e) =>
                                                setData("sku", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.sku}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Price</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Price"
                                            name="price"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.price}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">description</label>
                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="description"
                                            name="description"
                                            errors={errors.description}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData("description", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
  
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}