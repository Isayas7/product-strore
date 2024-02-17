import React from "react";
import { Send } from "@mui/icons-material";
import { SendSharp } from "@mui/icons-material";
import {
  YouTube,
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className=" bg-primery text-white px-10">
      <div className=" flex items-center justify-around py-8  ">
        <div className=" flex flex-5 gap-2">
          <SendSharp />
          <p className=" font-bold"> Sign Up For Newsletter</p>
        </div>
        <div className=" flex flex-6 bg-white rounded-md p-1">
          <input
            placeholder="Your Email"
            className=" focus:outline-none w-full py-1 px-2  text-lg rounded-l-md text-gray-700"
          />
          <button className=" bg-featuredColor px-4  rounded-md">
            SUBSCRIBE
          </button>
        </div>
      </div>
      <hr className=" h-0  border-t-headerBottomColor" />
      <div className="p-3 flex justify-around">
        <div className=" flex flex-col gap-2">
          <h1 className=" font-bold">Contact Us</h1>
          <div className="flex flex-col gap-2 font-thin">
            <span>Omni Store</span>
            <span>No.123 stratline, Addis Abeba, 10000 </span>
            <span>Addis Abeba</span>

            <span>
              <a href="tel:+251 946528712">+251 946528712</a>
            </span>
            <span>
              <a href="email:demo@gmail.com">demo@gmail.com</a>
            </span>
            <div className=" flex gap-2">
              <a
                href="www.facebook.com "
                className=" bg-gray-600 inline-block rounded-full p-1"
              >
                <Facebook />
              </a>

              <Link>
                <div className=" bg-gray-600 inline-block rounded-full p-1">
                  <Twitter />
                </div>
              </Link>
              <Link>
                <div className=" bg-gray-600 inline-block rounded-full p-1">
                  <Instagram />
                </div>
              </Link>
              <Link>
                <div className=" bg-gray-600 inline-block rounded-full p-1">
                  <YouTube />
                </div>
              </Link>
              <Link>
                <div className=" bg-gray-600 inline-block rounded-full p-1">
                  <Pinterest />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" font-bold">Information</h1>
          <div className="flex flex-col gap-2 font-thin">
            <span>Privacy policy</span>
            <span>Refund policy</span>
            <span>Shipping policy</span>
            <span>Terms Of Services policy</span>
            <span>Blogs</span>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" font-bold">Account</h1>
          <div className="flex flex-col gap-2 font-thin">
            <span>Search</span>
            <span>About us</span>
            <span>Faq</span>
            <span> Contact</span>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <h1 className=" font-bold">Quick Links</h1>
          <div className="flex flex-col gap-2 font-thin">
            <span>Laptops</span>
            <span>Mobile Phones</span>
            <span>Tablets</span>
            <span> Smart Watches</span>
          </div>
        </div>
      </div>
      <hr className=" h-0  border-t-headerBottomColor" />

      <div className="p-3">
        <p> © 2023. OmniStock</p>
      </div>
    </div>
  );
}

export default Footer;
