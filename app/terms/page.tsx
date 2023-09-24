export default function Terms() {
  return (
    <div className='w-3/4 mx-auto mt-3'>
      <header>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Terms and Conditions
        </h1>
      </header>
      <section className='flex flex-col space-y-10'>
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          1. Introduction
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          Welcome to SkillZeit (&quot;the Website&quot;). By accessing or using
          the Website, you agree to comply with and be bound by these Terms and
          Conditions.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          2. No Guarantee of Loss
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          The Website and its owners make no guarantee of any kind regarding the
          prevention of loss, financial or otherwise, while using the Website.
          You acknowledge that any investments, financial decisions, or actions
          taken based on information or services provided by the Website are
          done at your own risk, and the Website and its owners shall not be
          liable for any losses incurred.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          3. Changes to Terms and Conditions
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          We reserve the right to modify or revise these Terms and Conditions at
          any time. It is your responsibility to review these Terms and
          Conditions periodically for updates. Your continued use of the Website
          after any changes signifies your acceptance of the revised Terms and
          Conditions.
        </p>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          4. Contact Information
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at skillzeit@gmail.com.
        </p>
      </section>

      <footer className='mb-10'>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          &copy; 2023 SkillZeit. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
