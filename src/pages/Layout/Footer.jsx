import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
    <div className={`${styles["container"]} ${styles["proposition"]}`}>
      <div className={styles["content"]}>
        <div className={styles["vp"]}>
          <img
            className={styles["vp-icon"]}
            src="/assets/svgs/footer/bunny.svg"
            alt=""
          />
          <div className={styles["vp-text"]}>No tests on animals</div>
        </div>
        <div className={styles["vp"]}>
          <img
            className={styles["vp-icon"]}
            src="/assets/svgs/footer/water.svg"
            alt=""
          />
          <div className={styles["vp-text"]}>
            No animal-derived ingredients
          </div>
        </div>
        <div className={styles["vp"]}>
          <img
            className={styles["vp-icon"]}
            src="/assets/svgs/footer/wheat.svg"
            alt=""
          />
          <div className={styles["vp-text"]}>
            No gluten, or gluten byproducts
          </div>
        </div>
        <div className={styles["vp"]}>
          <img
            className={styles["vp-icon"]}
            src="/assets/svgs/footer/light.svg"
            alt=""
          />
          <div className={styles["vp-text"]}>Recyclable packaging</div>
        </div>
      </div>
    </div>
    <div className={`${styles["container"]} ${styles["utils"]}`}>
      <div className={styles["content"]}>
        <div className={styles["left-section"]}>
          <span className={styles["title"]}>How can we Help?</span>
          <div className={styles["list-items"]}>
            <span className={styles["item"]}>beautya branches</span>
            <span className={styles["item"]}>Contact Us</span>
            <span className={styles["item"]}>FAQ</span>
            <span className={styles["item"]}>Our Brand</span>
            <span className={styles["item"]}>Blog</span>
          </div>
        </div>
        <div className={styles["middle-section"]}>
          <span className={styles["title"]}>Products</span>
          <div className={styles["list-items"]}>
            <span className={styles["item"]}>Women Make up</span>
            <span className={styles["item"]}>Women Skincare</span>
            <span className={styles["item"]}>Gifts & Sets</span>
          </div>
        </div>
        <div className={styles["right-section"]}>
          <span className={styles["title"]}>
            keep in touch with beautya
          </span>
          <div className={styles["list-items"]}>
            <span className={styles["item"]}>
              Join the Beautya newsletter and be first to hear about news,
              offers and skincare advice
            </span>
            <div
              className={`${styles["subscribe-box"]} ${styles["item"]}`}
            >
              <input type="email" placeholder="Email Address" />
              <button className={styles["sub-btn"]}>Subscribe</button>
            </div>
            <div className={styles["term-and-check"]}>
              <img
                src="/assets/svgs/footer/checkbox.svg"
                alt="checkbox"
              />
              <span className={styles["condition"]}>
                By submitting your email, you agree to receive advertising
                emails from Beautya. Please review our Privacy Policy,
                which includes our Financial Incentive Notice for CA
                residents.
              </span>
              <span className={`${styles["mb"]} ${styles["condition"]}`}>
                I agree to Beautya’s Terms and Conditions and Privacy and
                Policy.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={`${styles["container"]} ${styles["contacts"]}`}>
      <div className={styles["content"]}>
        <div className={styles["button"]}>
          <img
            className={styles["contacts-icon"]}
            src="/assets/svgs/footer/location.svg"
            alt="location"
          />
          <span className={styles["contacts-text"]}>
            Dr. Richardson, California
          </span>
        </div>
        <div className={styles["button"]}>
          <img
            className={styles["contacts-icon"]}
            src="/assets/svgs/footer/call.svg"
            alt="call"
          />
          <span className={styles["contacts-text"]}>1-802-526-2463</span>
        </div>
        <div className={styles["social-media-icons"]}>
          <img
            src="/assets/svgs/footer/instagram.svg"
            alt="instagram"
            className={styles["contacts-icon"]}
          />
          <img
            src="/assets/svgs/footer/facebook.svg"
            alt="facebook"
            className={styles["contacts-icon"]}
          />
          <img
            src="/assets/svgs/footer/twitter.svg"
            alt="twitter"
            className={styles["contacts-icon"]}
          />
          <img
            src="/assets/svgs/footer/pinterest.svg"
            alt="pinterest"
            className={styles["contacts-icon"]}
          />
          <img
            src="/assets/svgs/footer/reddit.svg"
            alt="reddit"
            className={styles["contacts-icon"]}
          />
          <img
            src="/assets/svgs/footer/tiktok.svg"
            alt="tiktok"
            className={styles["contacts-icon"]}
          />
        </div>
      </div>
    </div>
    <div className={`${styles["container"]} ${styles["copyright"]}`}>
      <div className={styles["content"]}>
        <div className={styles["copyright-left"]}>
          <img src="/assets/svgs/footer/copyright.svg" alt="copyright" />
          <span className={styles["copyright-text"]}>
            2023 Beautya. All Rights Reserved.
          </span>
        </div>
        <div className={styles["term-and-privacy"]}>
          <span className={styles["term"]}>Terms & Conditions</span>
          <span className={styles["privacy"]}>Privacy Policy</span>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer