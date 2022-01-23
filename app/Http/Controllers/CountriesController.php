<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountriesController extends Controller
{

    public function list(Request $request)
    {
        return [
            'results' => Country::select(['id', 'name as text'])
                ->where('name', 'LIKE', '%' . $request->input("input") . '%')
                ->take(20)
                ->get()
        ];
    }

    public function get_visited_countries(Request $request)
    {
        return ['results' => $request->user()->get_visited_countries()->get()];
    }

    public function get_countries_to_visit(Request $request)
    {
        return ['results' => $request->user()->get_countries_to_visit()->get()];
    }

    public function create_visited_country(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
        ]);

        Country::findorFail($request->input("country_id"));
        $request->user()->get_visited_countries()->attach($request->input("country_id"));

        $request->user()->save();

        return ["success" => "Added successfully"];
    }

    public function delete_visited_country(Request $request, $country_id)
    {
        Country::findorFail($country_id);
        $request->user()->get_visited_countries()->detach($country_id);

        $request->user()->save();

        return ["success" => "Deleted successfully"];
    }

    public function create_country_to_visit(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
        ]);

        Country::findorFail($request->input("country_id"));
        $request->user()->get_countries_to_visit()->attach($request->input("country_id"));

        $request->user()->save();

        return ["success" => "Added successfully"];
    }

    public function delete_country_to_visit(Request $request, $country_id)
    {
        Country::findorFail($country_id);
        $request->user()->get_countries_to_visit()->detach($country_id);

        $request->user()->save();

        return ["success" => "Deleted successfully"];
    }
}
