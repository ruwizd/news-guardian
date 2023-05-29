import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import React, { useEffect, useState } from 'react';
import news_img from '../assets/news.jpg';

import NavBar from './NavBar';

export default function Feeds() {
    const [news, setNews] = useState([]);

    const fetchPost = async () => {
        await getDocs(collection(db, "news"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id })).filter((item) => item.prediction == 'REAL');;
                setNews(newData);
                console.log(querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id })));
            })
    }
    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <>
            <NavBar fetchPost={fetchPost} />
            <div className="feeds">
                <div className="container my-24 px-6 mx-auto">

                    <section className="mb-32 text-gray-800 text-center md:text-left">

                        <h2 className="text-3xl font-bold mb-12 text-center">Latest articles</h2>
                        {news && news.map((item) => (
                            <div className="flex flex-wrap mb-6" key={item.id}>
                                <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
                                    <div
                                        className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                                        <img src={item.img}
                                            className="w-full" alt="Louvre" />
                                        <a href="#!">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                        </a>
                                    </div>
                                </div>

                                <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
                                    <h5 className="text-lg font-bold mb-3">{item?.title}</h5>
                                    <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                                        {item?.category}
                                    </div>
                                    <p className="text-gray-500 mb-6">
                                        {/* <small>Published <u>13.01.2022</u> by */}
                                        <small>Published  by
                                            <a href="" className="text-gray-900">   {item?.name}</a></small>
                                    </p>
                                    <p className="text-gray-500">
                                        {item?.content}
                                    </p>
                                </div>
                            </div>
                        ))}




                    </section >

                </div >
            </div >
        </>
    )
}
