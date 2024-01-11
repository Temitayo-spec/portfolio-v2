import styles from '@/styles/About.module.scss';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../atoms/viewAtom';
import { useEffect, useRef } from 'react';

const About = () => {
  const [, setIsInView] = useRecoilState(viewAtom);

  const componentRef = useRef(null) as unknown as any;

  const handleScroll = () => {
    const triggerTop = window.innerHeight / 2; // Adjust as needed
    const triggerBottom = window.innerHeight;

    const rect = componentRef.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    if (elementTop < triggerBottom && elementBottom > triggerTop) {
      setIsInView(false);
    } else {
      setIsInView(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={styles.about__wrapper}>
      <div className={styles.about__inner}>
        <div className={styles.about__header}>
          <p>About me</p>
          <div className={styles.line__drawer} />
        </div>
        <section className={styles.main__content}>
          <div className={styles.title}>
            <h1>Temitayo</h1>
            <p>Frontend Developer</p>
          </div>

          <div className={styles.body__text}>
            <p>
              Greetings! I&apos;m Temitayo, a frontend developer with a deep
              passion for crafting seamless and interactive web experiences.
              With a strong foundation in frontend technologies and a keen eye
              for detail, I specialize in bringing designs to life through clean
              and efficient code.
            </p>

            <div className={styles.heading}>
              <p>Experience</p>
              <div className={styles.line__drawer} />
            </div>

            <p>
              As a frontend developer, I have accumulated 3 years of hands-on
              experience, working on a variety of projects that showcase my
              commitment to delivering high-quality and performant solutions. My
              journey in web development has allowed me to work on projects
              ranging from dynamic single-page applications to responsive
              websites, providing users with an engaging digital experience.
            </p>

            <div className={styles.heading}>
              <p>Development Philosophy</p>
              <div className={styles.line__drawer} />
            </div>

            <p>
              I believe in the power of code to transform ideas into reality.
              Every line of code I write is a deliberate step towards creating
              robust, user-friendly, and visually appealing applications. I am
              dedicated to staying current with the ever-evolving landscape of
              frontend technologies, ensuring that the solutions I build are not
              only cutting-edge but also sustainable.
            </p>

            <div className={styles.heading}>
              <p>Tech Stack</p>
              <div className={styles.line__drawer} />
            </div>

            <p>
              Proficient in a versatile tech stack, my skills include: <br />
              Languages: HTML, CSS, JavaScript (ES6+), Typescript <br />{' '}
              Frameworks: React.js/Next.js, React Native, Styled Components,
              Sanity.io, Framer motion, Gsap, Sass, Firebase, Node.js <br />{' '}
              State Management: Redux, Context API <br /> Build Tools: Webpack,
              Babel <br /> Version Control: Git/GitHub <br /> Responsive Design:
              Ensuring seamless user experiences across various devices
            </p>

            <div className={styles.heading}>
              <p>Collaborative Approach</p>
              <div className={styles.line__drawer} />
            </div>

            <p>
              Having collaborated with cross-functional teams, I understand the
              importance of effective communication and teamwork in the
              development process. Whether working with designers, backend
              developers, or project managers, I thrive in an environment where
              collaboration is key, ensuring that the final product meets both
              technical requirements and user expectations.
            </p>
            <div className={styles.heading}>
              <p>Continuous Learning</p>
              <div className={styles.line__drawer} />
            </div>

            <p>
              In the dynamic world of frontend development, continuous learning
              is essential. I actively seek opportunities to expand my skill
              set, stay informed about emerging technologies, and contribute to
              the vibrant developer community.
            </p>
            <div className={styles.heading}>
              <p>Let&apos;s Build Something Amazing</p>
              <div className={styles.line__drawer} />
            </div>

            <p ref={componentRef}>
              Whether you have a specific project in mind or you&apos;re looking
              for a frontend developer to join your team, I am excited about the
              prospect of turning ideas into functional and visually appealing
              digital experiences. Let&apos;s connect, collaborate, and create
              something extraordinary!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
