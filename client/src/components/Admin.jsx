import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
    labels: ['REAL', 'FAKE'],
    datasets: [
        {
            labels: ['REAL', 'FAKE'],
            data: [1, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function Admin() {
    const [news, setNews] = useState([]);
    const [table, setTable] = useState([]);
    const navigate = useNavigate();
    const [piChart, setPieChart] = useState({
        labels: ['REAL', 'FAKE'],
        datasets: [
            {
                labels: ['REAL', 'FAKE'],
                data: [1, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    })
    const [worldNewsPieChart, setWorldNewsPieChart] = useState({
        labels: ['REAL', 'FAKE'],
        datasets: [
            {
                labels: ['REAL', 'FAKE'],
                data: [1, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    })
    const [politicsNewsPieChart, setPoliticsNewsPieChart] = useState({
        labels: ['REAL', 'FAKE'],
        datasets: [
            {
                labels: ['REAL', 'FAKE'],
                data: [1, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    })
    const [piecdata, setPiecdata] = useState([1, 0])
    const [politicsNewsdata, setPoliticsNewsdata] = useState([1, 0])
    const [worldNewsdata, setWorldNewsdata] = useState([1, 0])



    const fetchPost = async () => {
        await getDocs(collection(db, "news"))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                const realData = data.filter((item) => item.prediction == 'REAL');
                const fakeData = data.filter((item) => item.prediction == 'FAKE');
                setNews(data)
                let preal = data.filter((item) => (item.category == 'Politics News' && item.prediction == 'REAL'));
                let pfake = data.filter((item) => (item.category == 'Politics News' && item.prediction == 'FAKE'));
                let wreal = data.filter((item) => (item.category == 'World News' && item.prediction == 'REAL'));
                let wfake = data.filter((item) => (item.category == 'World News' && item.prediction == 'FAKE'));
                setPiecdata([realData.length * 100 / (realData.length + fakeData.length), fakeData.length * 100 / (realData.length + fakeData.length)]);
                setPoliticsNewsdata([preal.length * 100 / (preal.length + pfake.length), pfake.length * 100 / (preal.length + pfake.length)]);
                setWorldNewsdata([wreal.length * 100 / (wreal.length + wfake.length), wfake.length * 100 / (wreal.length + wfake.length)]);
            })
    }

    useEffect(() => {
        setPieChart(data)
        fetchPost();
    }, [])

    useEffect(() => {
        setTable(groupBy(news))
    }, [news])

    useEffect(() => {
        console.log(table)
    }, [table])

    function groupBy(objectArray) {
        return objectArray.reduce(function (acc, obj) {
            var key = obj?.email;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    useEffect(() => {
        setPieChart({
            labels: ['REAL', 'FAKE'],
            datasets: [
                {
                    labels: 'asdasd',
                    data: piecdata,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })

    }, [piecdata])
    useEffect(() => {
        setPoliticsNewsPieChart({
            labels: ['REAL', 'FAKE'],
            datasets: [
                {
                    labels: 'asdasd',
                    data: politicsNewsdata,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })

    }, [politicsNewsdata])
    useEffect(() => {
        setWorldNewsPieChart({
            labels: ['REAL', 'FAKE'],
            datasets: [
                {
                    labels: 'asdasd',
                    data: worldNewsdata,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })

    }, [worldNewsdata])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
                navigate("/");
            }
        });

    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <NavBar />
            <div className="feeds">
                <div className="container my-24 px-6 mx-auto">
                    <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Log Out</button>


                    <section className="mb-32 text-gray-800 text-center md:text-left">

                        <h2 className="text-3xl font-bold mb-6 text-center">All News</h2>
                        <center>
                            <div style={{ width: "500px" }}>

                                <Pie data={piChart} />

                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-center mt-20">News Category</h2>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <div style={{ width: "300px" }}>
                                    <h4 className="text-xl font-bold  text-center">Politics News</h4>
                                    <Pie data={politicsNewsPieChart} />
                                </div>
                                <div style={{ width: "300px" }}>
                                    <h4 className="text-xl font-bold  text-center">World News</h4>
                                    <Pie data={worldNewsPieChart} />
                                </div>

                            </div>
                        </center>
                        <div class="relative overflow-x-auto mt-20">
                            <table class="w-full text-sm text-left text-gray-500 ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            User
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Prediction
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        news && news.map((item) => (
                                            <tr class="bg-white border-b ">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {item.name}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {item.email}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item.title}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item.category}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item.prediction}
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>

                    </section >

                </div >
            </div >
        </>
    )
}
