<?php

namespace App\Http\Controllers;

use App\Models\CountriesToVisit;
use App\Models\Country;
use App\Models\VisitedCountries;
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

        $user = [
            'user_id' => $request->user()->id
        ];

        VisitedCountries::create($request->all() + $user);
    }

    public function delete_visited_country(Request $request)
    {
        $country = VisitedCountries::where('id', $request->input("id"))->firstOrFail();
        $country->delete();
    }

    public function create_country_to_visit(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
        ]);

        $user = [
            'user_id' => $request->user()->id
        ];

        CountriesToVisit::create($request->all() + $user);
    }

    public function delete_country_to_visit(Request $request)
    {
        $country = CountriesToVisit::where('id', $request->input("id"))->firstOrFail();
        $country->delete();
    }
}
