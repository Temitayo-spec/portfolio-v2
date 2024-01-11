import Link from 'next/link';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { WorkRowProps } from '../../../../../interfaces';

const lineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const WorksRow = ({ work }: { work: WorkRowProps }) => {
  const {
    clients_collaborators,
    roles,
    brief_discussion,
    project_title,
    project__link,
  } = work;
  return (
    <div className={styles.row__wrapper}>
      <div className={styles.row__inner}>
        <h1 className={styles.work__title}>{project_title}</h1>
        <div className={styles.flex__ctn}>
          <div className={styles.item__one}>
            <p>{brief_discussion}</p>
            <div className={styles.client__collaborators}>
              <p>Client & Collaborators</p>
              {clients_collaborators.map((client, i) => (
                <p key={i}>{client.title}</p>
              ))}
            </div>
          </div>
          <div className={styles.item__two}>
            <p>Role</p>
            {roles.map((role, i) => (
              <p key={i}>{role.role_list}</p>
            ))}
          </div>
        </div>
        <Link href={project__link} rel="noopener noreferrer" target="_blank">
          Visit Site
        </Link>
      </div>
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        className={styles.line__drawer}
      />
    </div>
  );
};

export default WorksRow;
