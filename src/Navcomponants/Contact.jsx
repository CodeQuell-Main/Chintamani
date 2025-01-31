import React from 'react'
import emailjs from 'emailjs-com';

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
        emailjs.send('service_q4nja4q', 'template_j71t2rl', formData)
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setSuccessMessage('Your message has been sent successfully!');
            setFormData({ name: '', email: '', message: '' });
          }, (error) => {
            console.error('Email send failed:', error);
            setSuccessMessage('Failed to send your message. Please try again.');
          });
      };

  return (
    <>
    <div className="bg-[#faf7f0] lg:px-20 px-10 max-[800px]:pb-20 max-[800px]:pb-16">
    <h1 className="text-[#4A4947] text-3xl font-extrabold pt-6">Get in touch</h1>
        <div className="grid grid-cols-6 max-[600px]:grid-cols-1 pt-10 max-[800px]:gap-4">
            
            <div className="min-[1000px]:col-span-4 col-span-3 max-[600px]:row-start-2 ">
               

                <div className="grid grid-cols-6 max-[950px]:grid-cols-4 pt-4 gap-8 contact">
                    
                    <div className="col-span-2 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-evenly items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 max-[1200px]:p-2 rounded-xl"><img src="/images/Instagram.svg" alt="ChintamaniInsatgram" className="max-[1100px]:w-6" /></a>
                            <a href="" className=" bg-[#d8d2c233] p-4 max-[1200px]:p-2 rounded-xl"><img src="/images/Facebook.svg" alt="ChintamaniFacebook" className="max-[1100px]:w-6" /></a>
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-center pt-3 pb-8">Connect on social media </p>
                    </div>

                    <div className="col-span-2 lg:col-start-4 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="https://wa.me/+919146238835" target="_blank" rel="noreferrer" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/WhatsApp.svg" alt="ChintamaniWhatsapp" className="max-[1100px]:w-6" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-center md:text-left max-[600px]:text-left max-[600px]:px-5  md:px-8 pt-3 pb-8">Chat to support </p>
                    </div>

                    <div className="col-span-2 row-start-2  bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/MapMarker.svg" alt="ChintamaniLocation" className="max-[1100px]:w-6" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-center md:text-left max-[600px]:text-left max-[600px]:px-5  md:px-8 pt-3 pb-8">Visit us  </p>
                    </div>

                    <div className="col-span-2 row-start-2 lg:col-start-4 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/Phone.svg" alt="ChintamaniPhone" className="max-[1100px]:w-6" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-center md:text-left max-[600px]:text-left max-[600px]:px-5  md:px-8 pt-3 pb-8">Call Us </p>
                    </div>
                    
                </div>
            </div>
            
            
            <div className="min-[1000px]:col-span-2 col-span-3">
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
                            <textarea name="message" id="message" value={formData.email} onChange={handleChange} rows={5} placeholder='Text Here' className=" rounded-2xl text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full"></textarea>
                        </div>

                        <div className="flex justify-center items-center pt-6">
                            <button type="submit" className='text-white font-bold text-2xl bg-[#232629] rounded-full px-10 py-2 '>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        
        </div>
    </div>
  </>
  )
}

export default Contact
