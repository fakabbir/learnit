export default function Policy() {
  return (
    <div className='w-3/4 mx-auto mt-3'>
      <header>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Privacy Policy
        </h1>
      </header>
      <section className='flex flex-col space-y-10'>
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          1. Introduction
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          This Privacy Policy outlines how SkillZeit (&quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;) collects, uses, discloses, and
          protects your personal information when you visit our website or use
          our services.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          2. Information We Collect
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          We may collect various types of information, including but not limited
          to:
        </p>
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
          <li>
            Personal information (e.g., name, email address, contact
            information)
          </li>
          <li>Usage data (e.g., IP address, browser type, pages visited)</li>
          <li>Cookies and tracking technologies</li>
          <li>Location data (if applicable)</li>
        </ul>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          3. How We Use Your Information
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          We may use your information for various purposes, including:
        </p>
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
          <li>Providing and improving our services</li>
          <li>Personalizing your experience</li>
          <li>Marketing and communication</li>
          <li>Legal and security purposes</li>
        </ul>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          4. Your Rights
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          You have the right to:
        </p>
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
          <li>Access, correct, or delete your personal information</li>
          <li>Withdraw consent (if applicable)</li>
          <li>Object to the processing of your data</li>
          <li>Request data portability</li>
        </ul>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          5. Contact Us
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at skillzeit@gmail.com.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          6. Changes to This Policy
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          We may update this Privacy Policy to reflect changes in our practices
          or for other operational, legal, or regulatory reasons. We will notify
          you of any changes by posting the updated policy on our website.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          7. Effective Date
        </h2>
        <p>This Privacy Policy is effective as of Oct 2023.</p>
      </section>

      <footer className='mb-10'>
        <p>&copy; 2023 SkillZeit. All rights reserved.</p>
      </footer>
    </div>
  );
}
