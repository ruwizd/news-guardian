import React, { useRef } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Modal({ fetchPost }) {
    const [showModal, setShowModal] = React.useState(false);
    const [news, setNews] = React.useState({});

    const form = useRef();

    const addNews = async (e) => {
        e.preventDefault()
        try {

            axios.post('http://127.0.0.1:5000/predict', { original_text: news.content, email: news.email }).then((response) => {
                console.log(response.data);
                // await setNews({ ...news, prediction: response.data.prediction })
                uploadNews(response.data.prediction)
                if (response.data.prediction == "FAKE") {
                    toast.error("Detect fake news!")
                    setNews({});
                    setShowModal(false)

                } else {
                    toast.success("News added successfully")
                    setNews({});
                    setShowModal(false)
                }

            })
        } catch (error) {
            console.log(error);

        }
        // await uploadNews()

    }

    const uploadNews = async (prediction) => {
        // console.log(prediction);
        // return;
        setNews({ ...news, prediction: prediction })
        try {
            const docRef = await addDoc(collection(db, "news"), {
                ...news,
                prediction
            });
            console.log("Document written with ID: ", docRef);
            setNews({});
            fetchPost()
            setShowModal(false)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



    return (
        <>
            <button onClick={() => setShowModal(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add news</button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ width: '700px' }}>
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add News
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <form onSubmit={addNews} ref={form}>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className="w-full">
                                            <div className="mb-6">
                                                <label for="name" className="block mb-2 text-sm font-medium ">Name</label>
                                                <input type="text" id="name" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { setNews({ ...news, name: e.target.value }) }} required value={news.name} />
                                            </div>
                                            <div className="mb-6">
                                                <label for="email" className="block mb-2 text-sm font-medium ">Email</label>
                                                <input type="text" id="email" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { setNews({ ...news, email: e.target.value }) }} required value={news.email} />
                                            </div>
                                            <div className="mb-6">
                                                <label for="img" className="block mb-2 text-sm font-medium ">News Image</label>
                                                <input type="text" id="img" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { setNews({ ...news, img: e.target.value }) }} required value={news.img} />
                                            </div>
                                            <div className="mb-6">
                                                <label for="title" className="block mb-2 text-sm font-medium ">News Title</label>
                                                <input type="text" id="title" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { setNews({ ...news, title: e.target.value }) }} required value={news.title} />
                                            </div>
                                            <div className="mb-6">
                                                <label for="content" className="block mb-2 text-sm font-medium ">News Content</label>
                                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="News Content..."
                                                    onChange={(e) => { setNews({ ...news, content: e.target.value }) }} value={news.content} required></textarea>
                                            </div>
                                            <div className="mb-6">
                                                <label for="content" className="block mb-2 text-sm font-medium ">News Category</label>
                                                <select id="countries" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => { setNews({ ...news, category: e.target.value }) }}
                                                    required value={news.category}>
                                                    <option value="">Choose a Category</option>
                                                    <option value="Politics News">Politics News</option>
                                                    <option value="World News">World News</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
