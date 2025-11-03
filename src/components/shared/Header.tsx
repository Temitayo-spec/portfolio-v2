'use client';
import { useSidebarStore } from "@/src/store/sidebar.store";
import AnimatedLink from "./AnimatedLink";
import MaskText from "./MaskText";

const Header = () => {
  const locationPhrase = ['currently living in', 'Lagos, Nigeria'];

  const { sidebar, setSidebar, toggleSidebar } = useSidebarStore();

  return (
    <section className="bg-main-bg relative z-3 transition-all">
      <div className="flex items-center justify-between wrapper py-8 relative">
        {/* Left Section */}
        <div className="flex flex-2 justify-between max-w-[70%]">
          {/* Logo */}
          <div className="flex-[0.5]">
            <div onClick={() => setSidebar(false)} className="uppercase w-auto">
              <AnimatedLink
                title="Ty"
                secondTitle="Temitayo"
                isLink={true}
                href="/"
              />
            </div>
          </div>

          {/* Location */}
          <div className="location-text">
            <MaskText phrases={locationPhrase} tag="p" />
          </div>
        </div>

        {/* Right Section - Menu */}
        <div className="flex-1 flex justify-end z-10 absolute right-0">
          <div className="text-white font-spline-sans text-base tracking-[-0.02rem] flex items-center gap-[0.3rem] leading-[100%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none"
            >
              <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
            </svg>
            <AnimatedLink
              title={sidebar ? 'close' : 'menu'}
              isLink={false}
              onClick={() => toggleSidebar()}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Logo styling */
        .location-text :global(div div p) {
          color: #d9d9d9;
          line-height: 120%;
          letter-spacing: -0.02rem;
        }

        .location-text :global(div div:last-of-type p) {
          color: #fff;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .location-text :global(div div p) {
            font-size: 0.675rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Header;
