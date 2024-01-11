export interface AnimProps {
  initial: { opacity: number } | { top: string } | { d: any };
  enter:
    | {
        opacity: number;
        top: number;
        transition: { duration: number; delay: number; ease: number[] };
        transitionEnd: { top: string };
      }
    | {
        top: string;
        transition: { duration: number; delay: number; ease: number[] };
        transitionEnd: { top: string };
      }
    | {
        d: any;
        transition: { duration: number; delay: number; ease: number[] };
      };
  exit:
    | {
        opacity: number;
        top: string;
        transition: { duration: number; delay: number; ease: number[] };
      }
    | { top: string; transition: { duration: number; ease: number[] } }
    | { d: any; transition: { duration: number; ease: number[] } };
}
