import type { NextPage } from 'next';
import { Meta, Avatar, Carousel, Testimonial } from '../components';
import styles from '../styles/Home.module.scss';
import { testimonials } from '../data';

const Home: NextPage = () => {
  return (
    <div className={'styles.container'}>
      <Meta desc="Pallavi Singh - Counselling Psychologist" />

      <div className={'styles.main'}>
        {/***************************************************************************/}
        {/* SLIDESHOW / HERO IMAGE */}
        {/***************************************************************************/}
        <Carousel className="hero-slideshow" />

        {/***************************************************************************/}
        {/* ABOUT */}
        {/***************************************************************************/}
        <section className={styles.about}>
          <h2 id="about-us" className="text-center">
            About Us
          </h2>
          <Avatar />
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            deleniti? Saepe repellat reiciendis aut consequuntur nesciunt eaque
            ut mollitia asperiores ipsum recusandae. Saepe explicabo magnam
            natus earum fuga odio suscipit architecto iure magni. Hic,
            cupiditate similique? Distinctio error veniam quia dicta,
            repellendus eligendi minima excepturi minus explicabo voluptas
            labore? Molestiae magnam neque, perferendis facilis fuga, nisi est
            culpa id ducimus sit recusandae unde, veniam eum eos maxime
            consequuntur nostrum explicabo. Ipsam, dicta! Alias atque neque
            temporibus totam, voluptas voluptate delectus saepe laudantium.
            Suscipit similique voluptate cumque itaque, voluptatibus a,
            perspiciatis molestiae magnam recusandae deleniti nihil eaque iusto
            eveniet earum, consequatur libero eum? Sequi doloribus fuga sint
            assumenda, praesentium voluptas minus iure sapiente repellat.
            Officia distinctio minus unde illo illum quae!
          </p>
        </section>

        <hr />

        {/***************************************************************************/}
        {/* TESTIMONIALS */}
        {/***************************************************************************/}
        <section className="testimonials">
          <h2 className="text-center">Testimonials</h2>
          <Carousel
            items={testimonials.map((t, i) => ({
              position: i + 1,
              component: <Testimonial data={t} />,
            }))}
            visibleItems={3}
          />
        </section>

        <hr />

        {/***************************************************************************/}
        {/* CONTACT */}
        {/***************************************************************************/}
        <section className="contact">
          <h2 id="contact-us" className="text-center">
            Contact Us
          </h2>
        </section>

        <hr />
      </div>
    </div>
  );
};

export default Home;
