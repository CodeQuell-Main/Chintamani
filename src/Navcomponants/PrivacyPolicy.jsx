import { Link } from "react-router-dom"

function PrivacyPolicy () {
    return(
        <>
        <section className="pp bg-gradient-to-r from-[##b6e7f8] to-[#d7d7f2] pb-20 pt-4">
        <div className=""><Link to='/'><img src="/images/mobile-Home.svg" alt="" className="mb-2" /></Link></div>
        <div className="ppmain flex flex-col justify-center items-center mx-10 md:mx-20 ">  
        <div className="header w-full ">
            <h1 className="font-bold text-2xl">Privacy Policy</h1>
        </div>
        <div className="container">
        <div>
            <p className="date">Effective Date: 29 Jan 2025.</p>
            <p>Welcome to Chintamani! Your privacy is important to us. This Privacy Policy
             outlines how we collect, use, and protect your personal information when you
             use our website.</p>

        <div>
            <h2 className="font-bold text-xl">1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <li><span>Personal Information:</span>Name, email address, phone number, shipping and billing addresses, and payment details.</li>
            <li><span>Non-Personal Information:</span>Browser type, IP address, device information, and browsing behavior on our website.</li>
        </div>
        <div>
            <h2 className="font-bold text-xl">2. How We Use Your Information:</h2>
            <p>We use your information for the following purposes:</p>
            <li>To process and fulfill your orders.</li>
            <li>To improve our website, products, and services.</li>
            <li>To communicate with you regarding orders, promotions, and updates.</li>
            <li>To comply with legal obligations.</li>
        </div>
        <div>
            <h2 className="font-bold text-xl">3. Sharing Your Information</h2>
            <p>We do not sell or rent your personal information. However, we may share your information with:</p>
            <li><span>Service Providers:</span>Payment processors, shipping partners, and marketing services.</li>
            <li><span>Legal Authorities:</span> If required by law or to protect our rights and users.</li>
        </div>
        <div>
            <h2 className="font-bold text-xl">4. Data Security</h2>
            <p>We implement security measures to protect your data. However, no method of transmission over the internet is completely secure.</p>
        </div>
        <div>
            <h2 className="font-bold text-xl">5. Your Rights</h2>
            <p>You have the right to:</p>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request details on how your data is used.</li>
        </div>
        <div>
            <h2 className="font-bold text-xl">6. Cookies and Tracking Technologies</h2>
            <p>We use cookies to enhance your browsing experience. You can manage your cookie preferences in your browser settings.</p>
        </div>
        <div>
            <h2 className="font-bold text-xl">7. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with the updated effective date.</p>
        </div>
        <div>
            <h2 className="font-bold text-xl">8. Contact Us</h2>
            <p>For questions or concerns about this Privacy Policy, please contact us at:</p>
            <p><span>Email:</span>chintamanifoodproductscq@gmail.com</p>
            <p><span>Phone:</span>+91 9404164156</p>
            <p><span>Address:</span>Shop No.1goverment Hospital Oop Super Grahak Bajar, near by Post Office, Kudal, Maharashtra 416520 </p>
        </div>
        </div>
        </div>
        </div>
        </section>

        </>
    )
}

export default PrivacyPolicy