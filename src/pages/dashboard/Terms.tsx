import { Link } from 'react-router-dom';

const TermsPage = () => {

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">Terms & Conditions</h2>
          <p className="text-gray-500 text-sm">Manage Terms & Conditions content</p>
        </div>
        <Link
          to="/terms/edit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-10 rounded-lg cursor-pointer flex items-center justify-center text-sm no-underline transition-colors"
        >
          Edit Terms
        </Link>
      </div>

      <div className="bg-[#1A1C1E] rounded-2xl p-6 md:p-8 border border-gray-800/50 shadow-2xl space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-500">1. Introduction</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Welcome to Carfu AI. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-500">2. User Accounts</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Users are responsible for maintaining the confidentiality of their account information and password. You agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-500">3. Usage Policy</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our platform utilizes AI technologies to generate content. You agree not to use the generated content for illegal purposes or in a way that violates any third-party rights.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-500">4. Privacy</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and safeguard your personal information.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-500">5. Modifications</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Carfu AI reserves the right to modify these terms at any time. Your continued use of the platform following any changes constitutes your acceptance of the new terms.
          </p>
        </section>

        <div className="pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">Last Updated: April 28, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
