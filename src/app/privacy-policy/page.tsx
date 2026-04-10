import React from 'react';
import styles from './style.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const PrivacyPolicy = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.content}>
          <div className={styles.policyBlock}>
            <h2>1. Information We Collect</h2>
            <p>When you use Travel Tracker, we may collect the following information:</p>
            <ul>
              <li><strong>Usage Data:</strong> We use Google Analytics to monitor and analyze the use of our service. This may include information such as your device&apos;s Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
              <li><strong>Account Information:</strong> If you choose to log in using Firebase Authentication, we store basic profile information such as your email address and name.</li>
              <li><strong>User Content:</strong> Trips, locations, and photos you upload to the platform.</li>
            </ul>
          </div>

          <div className={styles.policyBlock}>
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our Service.</li>
              <li>To monitor the usage of our Service using Google Analytics.</li>
              <li>To manage your account and authentication across devices.</li>
              <li>To improve and optimize the user experience.</li>
            </ul>
          </div>

          <div className={styles.policyBlock}>
            <h2>3. Cookies and Tracking Technologies</h2>
            <p>
              We use Cookies and similar tracking technologies to track the activity on our Service and store certain information.
              Google Analytics uses cookies to collect data about your interactions with the site.
            </p>
          </div>

          <div className={styles.policyBlock}>
            <h2>4. Third-Party Services</h2>
            <p>We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, or to assist us in analyzing how our Service is used.</p>
            <ul>
              <li><strong>Google Analytics:</strong> Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service.</li>
              <li><strong>Firebase:</strong> Used for authentication and data storage.</li>
            </ul>
          </div>

          <div className={styles.policyBlock}>
            <h2>5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact the developer at <a href="mailto:egorarkharov@gmail.com">egorarkharov@gmail.com</a>.</p>
          </div>

          <p className={styles.date}>Effective Date: April 10, 2026</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
