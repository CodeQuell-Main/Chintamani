import React from 'react'
import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        emailjs.init('phT3bVQyJS6V2q99B'); // Replace with your actual User ID
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                'service_q4nja4q',
                'template_zspzjji',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                'phT3bVQyJS6V2q99B'
            )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSuccessMessage('Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error('Email send failed:', error);
                setSuccessMessage('Failed to send your message. Please try again.');
            });
    };


    return (
        <>
            <section className="bg-white">
                <div className="my-10 md:mx-20">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.0904507752107!2d73.68408397490273!3d16.008806284661972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc00fa01124bf8f%3A0x9e0197b92204693c!2sCHINTAMANI%20FOOD%20PRODUCTS!5e0!3m2!1sen!2sin!4v1738748614302!5m2!1sen!2sin" className='w-full h-[50vh] border-2 loas'></iframe>
                </div>

                <div className="bg-[#fff8f3] lg:px-20 px-10 max-[800px]:pb-20 my-4 pb-4">
                    <h1 className="text-[#4A4947] text-3xl font-extrabold pt-6">Get in touch</h1>
                    <div className="grid grid-cols-2 max-[600px]:grid-cols-1 items-center pt-10 max-[800px]:gap-4">

                        <div className="">
                            <h1 className="text-4xl font-bold ">Our Locations:</h1>

                            <div className="flex items-center gap-4 mt-6">
                                <i class="fa-solid fa-location-dot text-[#ff770f] text-2xl"></i>
                                <p className="">Shop No.1goverment Hospital Oop Super Grahak Bajar, near by Post Office, Kudal, Maharashtra 416520</p>
                            </div>

                            <div className="mt-6">
                                <img src="https://websitedemos.net/italian-restaurant-02/wp-content/uploads/sites/283/2018/09/divider-free-img.png" alt="" className="" />
                            </div>

                            <div className="mt-10">
                                <div className="flex justify-start items-center col-end-12 gap-4 py-6">
                                    <i className="fa-brands fa-facebook-f text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i>
                                    <i className="fa-brands fa-x-twitter text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i>
                                    <i className="fa-brands fa-instagram text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i>
                                    <i className="fa-brands fa-linkedin-in text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i>
                                </div>
                            </div>



                        </div>


                        <div className="">
                            <div className="bg-white text-[#4A4947] px-8 py-6 rounded-xl">

                                <form action="" className="" onSubmit={handleSubmit}>
                                    <div className="flex flex-col justify-start gap-2">
                                        <label htmlFor="" className='font-bold text-lg '>Name </label>
                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className=' rounded-full text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full' />
                                    </div>

                                    <div className="flex flex-col justify-start gap-2 pt-6">
                                        <label htmlFor="" className='font-bold text-lg '>Email </label>
                                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className=' rounded-full text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full' />
                                    </div>

                                    <div className="flex flex-col justify-start gap-2 pt-6">
                                        <label htmlFor="" className='font-bold text-lg '>Message </label>
                                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={5} placeholder='Text Here' className=" rounded-2xl text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full"></textarea>
                                    </div>

                                    <div className="flex justify-center items-center pt-6">
                                        <button type="submit" className='text-white font-semibold text-2xl bg-[#ff770f] rounded-full px-10 py-2 '>Submit</button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>


                </div>

                <div className="mt-12 bg-slate-700 py-6">
                    <p className="text-center md:text-xl text-[10px] text-white flex justify-center  items-center gap-3 ">All right reserved <li className=""><Link to="/Privacy-Policy">Privacy policy</Link></li> <li>&copy; Chintamani Food Products</li>  <li><a href="https://codequell.com/" target='_blank' className="">Developed by CodeQuell</a></li>  </p>

                    <div className="flex justify-center items-center col-end-12 gap-4 py-6">
                        <Link to=""> <i className="fa-brands fa-facebook-f text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
                        <Link to=""> <i className="fa-brands fa-twitter text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
                        <Link to=""> <i className="fa-brands fa-instagram text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
                        <Link to=""> <i className="fa-brands fa-linkedin-in text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
                    </div>

                    <Link to="https://codequell.com/">
                        <div className="flex justify-center items-center">
                            <img src="/logo-color.png" alt="" className="w-32" />
                        </div>
                    </Link>
                </div>
            </section>

        </>
    )
}

export default Contact
