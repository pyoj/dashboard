<?php

use App\Http\Controllers\CountriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/countries/list', [CountriesController::class, 'list']);
Route::get('/countries/list/visited', [CountriesController::class, 'get_visited_countries']);
Route::get('/countries/list/to_visit', [CountriesController::class, 'get_countries_to_visit']);

Route::post('/countries/create/visited', [CountriesController::class, 'create_visited_country']);
Route::delete('/countries/visited/{country_id}', [CountriesController::class, 'delete_visited_country']);

Route::post('/countries/create/to_visit', [CountriesController::class, 'create_country_to_visit']);
Route::delete('/countries/to_visit/{country_id}', [CountriesController::class, 'delete_country_to_visit']);
