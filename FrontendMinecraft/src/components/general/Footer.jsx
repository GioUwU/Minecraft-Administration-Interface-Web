import styles from "@/styles/style";
import Link from "next/link";

const Footer =() => {

   const footerLinks = [
     {
       title: "StaffTeam",
       links: [
         {
           name: "StaffTeam",
           link: "/staffteam",
         },
       ],
     },
     {
       title: "Legal",
       links: [
         {
           name: "Terms and Conditions",
           link: "/terms-conditions",
         },
         {
           name: "Privacy Policy",
           link: "/privacy-policy",
         },
         {
           name: "Cookie Policy",
           link: "/cookie-policy",
         },
       ],
     },
     {
       title: "Partner",
       links: [
         {
           name: "Our Partner",
           link: "/mariana-partners",
         },
         {
           name: "Become a Partner",
           link: "/join-our-partner",
         },
       ],
     },
   ];


return (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
          >
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <Link href={link.link} key={link.name}>
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2022 MonsterMC. All Rights Reserved.
      </p>
    </div>
  </section>
);
};

export default Footer;
