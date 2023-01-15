<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
        $products = Product::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'product_name' => ['required'],
            'price' => ['required'],
            'sku' => ['required'],
            'description' => ['required'],

        ])->validate();
        $request['user_id'] = auth()->user()->id;
        Product::create($request->all());

        return redirect()->route('products.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'product_name' => ['required'],
            'price' => ['required'],
            'sku' => ['required'],
            'description' => ['required'],
        ])->validate();

        $request['user_id'] = auth()->user()->id;
        Product::find($id)->update($request->all());
        return redirect()->route('products.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function destroy($id)
    {
        Product::find($id)->delete();
        return redirect()->route('products.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function uploadContent(Request $request)
    {
        $file = $request->file('uploaded_file');
        if ($file) {
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $tempPath = $file->getRealPath();
            $fileSize = $file->getSize();
            $this->checkUploadedFileProperties($extension, $fileSize);
            $location = 'uploads';
            $file->move($location, $filename);
            $filepath = public_path($location . "/" . $filename);
            $file = fopen($filepath, "r");
            $importData_arr = array();
            $i = 0;
            while (($filedata = fgetcsv($file, 1000, ",")) !== FALSE) {
                $num = count($filedata);
                if ($i == 0) {
                    $i++;
                    continue;
                }
                for ($c = 0; $c < $num; $c++) {
                    $importData_arr[$i][] = $filedata[$c];
                }
                $i++;
            }
            fclose($file);
            foreach ($importData_arr as $importData) {
                Product::create([
                    'product_name' => $importData[0],
                    'sku' => $importData[1],
                    'price' => $importData[2],
                    'description' => $importData[3],
                    'user_id' => auth()->user()->id
                ]);
            }

            return redirect()->route('products.index');
        } else {
            //no file was uploaded
            throw new \Exception('No file was uploaded', Response::HTTP_BAD_REQUEST);
        }
    }
    public function checkUploadedFileProperties($extension, $fileSize)
    {
        $valid_extension = array("csv", "xlsx"); //Only want csv and excel files
        $maxFileSize = 2097152; // Uploaded file size limit is 2mb
        if (in_array(strtolower($extension), $valid_extension)) {
            if ($fileSize <= $maxFileSize) {
            } else {
                throw new \Exception('No file was uploaded', Response::HTTP_REQUEST_ENTITY_TOO_LARGE); //413 error
            }
        } else {
            throw new \Exception('Invalid file extension', Response::HTTP_UNSUPPORTED_MEDIA_TYPE); //415 error
        }
    }
}
