<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitedCountries extends Model
{
    use HasFactory;

    protected $table = "visited_countries";
    public $timestamps = false;

    protected $fillable = [
        'country_id',
        'user_id',
    ];
}
