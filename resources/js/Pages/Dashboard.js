import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import AsyncSelect from "react-select/async";

export default function Dashboard(props) {
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [countriesToVisit, setCountriesToVisit] = useState([]);

    const [visitedCountryValue, setVisitedCountryValue] = useState(null);
    const [countryToVisitValue, setCountryToVisitValue] = useState(null);

    useEffect(() => {
        fetchVisitedCountries();
        fetchCountriesToVisit();
    }, []);

    const fetchVisitedCountries = () => {
        fetch("/api/countries/list/visited")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setVisitedCountries(json.results);
            });
    };

    const fetchCountriesToVisit = () => {
        fetch("/api/countries/list/to_visit")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setCountriesToVisit(json.results);
            });
    };

    const handleAddVisitedCountry = async () => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        const data = {
            country_id: visitedCountryValue.value,
        };

        await fetch("/api/countries/create/visited", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token.content,
            },
            body: JSON.stringify(data),
        }).then(fetchVisitedCountries);
    };

    const handleRemoveVisitedCountry = async (id) => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        const data = {
            id: id,
        };

        await fetch("/api/countries/visited", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token.content,
            },
            body: JSON.stringify(data),
        }).then(fetchVisitedCountries);
    };

    const handleAddCountryToVisit = async () => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        const data = {
            country_id: countryToVisitValue.value,
        };

        await fetch("/api/countries/create/to_visit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token.content,
            },
            body: JSON.stringify(data),
        }).then(fetchCountriesToVisit);
    };

    const handleRemoveCountryToVisit = async (id) => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        const data = {
            id: id,
        };

        await fetch("/api/countries/to_visit", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token.content,
            },
            body: JSON.stringify(data),
        }).then(fetchCountriesToVisit);
    };

    const loadCountriesOptions = (val) => {
        return fetch(
            "/api/countries/list?" +
                new URLSearchParams({
                    input: val,
                })
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const options = json.results.map((option) => ({
                    label: option.text,
                    value: option.id,
                }));

                return options;
            });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-6 flex">
                <div className="max-w-7xl sm:px-6 lg:px-8 flex-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Map
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="py-6">
                                <h6>Visited Countries</h6>
                                <div className="py-6 flex">
                                    <AsyncSelect
                                        className="flex-1 px-1"
                                        menuPosition="fixed"
                                        loadOptions={loadCountriesOptions}
                                        onChange={setVisitedCountryValue}
                                        value={visitedCountryValue}
                                        cacheOptions
                                        defaultOptions
                                    />
                                    <button
                                        className="flex-2 bg-green-600 text-white p-1 rounded"
                                        onClick={handleAddVisitedCountry}
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="border border-sky-600 rounded px-2 grid grid-cols-1 divide-sky-600 divide-y-2">
                                    {visitedCountries.map((item) => (
                                        <div
                                            key={item.pivot.id}
                                            className="py-3"
                                        >
                                            <span>{item.name}</span>
                                            <button
                                                className="float-right bg-red-600 text-white p-1 rounded"
                                                onClick={() =>
                                                    handleRemoveVisitedCountry(
                                                        item.pivot.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="py-6">
                                <h6>Countries to visit</h6>
                                <div className="py-6 flex">
                                    <AsyncSelect
                                        className="flex-1 px-1"
                                        menuPosition="fixed"
                                        loadOptions={loadCountriesOptions}
                                        onChange={setCountryToVisitValue}
                                        value={countryToVisitValue}
                                        cacheOptions
                                        defaultOptions
                                    />
                                    <button
                                        className="flex-2 bg-green-600 text-white p-1 rounded"
                                        onClick={handleAddCountryToVisit}
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="border border-sky-600 rounded px-2 grid grid-cols-1 divide-sky-600 divide-y-2">
                                    {countriesToVisit.map((item) => (
                                        <div
                                            key={item.pivot.id}
                                            className="py-3"
                                        >
                                            <span>{item.name}</span>
                                            <button
                                                className="float-right bg-red-600 text-white p-1 rounded"
                                                onClick={() =>
                                                    handleRemoveCountryToVisit(
                                                        item.pivot.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
