import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm, usePage,Link } from '@inertiajs/inertia-react';


export default function Dashboard(props) {
    const { products } = usePage().props

    function destroy(e) {
        if (confirm("Are you sure you want to delete this product?")) {
            Inertia.delete(route("products.destroy", e.currentTarget.id));
        }
    }

    const { data, setData, errors, post, progress } = useForm({
        uploaded_file: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("products-import"));
        setData("uploaded_file", null)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-8">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("products.create")}
                                >
                                    Create Product
                                </Link>
                                
                                <div className="mb-1">
                                    <form name="createForm" onSubmit={handleSubmit}>
                                    <div className="flex items-center justify-between mb-6">
                                            <div className="mb-4">
                                                <label className="">Upload csv File</label>
                                                <input
                                                required
                                                    type="file"
                                                    className="w-full px-4 py-2"
                                                    label="Uploaded file"
                                                    name="uploaded_file"
                                                    onChange={(e) =>
                                                        setData("uploaded_file", e.target.files[0])
                                                    }
                                                />
                                                <span className="text-red-600">
                                                    {errors.uploaded_file}
                                                </span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="px-6 py-2 font-bold text-white bg-pink-500 rounded"
                                            >
                                                Import CSV
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Product Name</th>
                                        <th className="px-4 py-2">Sku</th>
                                        <th className="px-4 py-2">Price</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                    {products.map(({ id, product_name, sku, price, description }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{id}</td>
                                            <td className="border px-4 py-2">{product_name}</td>
                                            <td className="border px-4 py-2">{sku}</td>
                                            <td className="border px-4 py-2">{price}</td>
                                            <td className="border px-4 py-2">{description}</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("products.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {products.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No contacts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}