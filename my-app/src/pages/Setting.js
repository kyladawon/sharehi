import Header from '../components/Header';
import LandingFooter from '../components/LandingFooter';

const Setting = () => {
    return (
      <>
        <Header />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-3xl font-semibold text-center mb-6">Setting</h1>
                <div className="text-center mt-4">
                    <p className="text-gray-700 font-medium text-center mb-8">
                        Privacy & Security
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        Password
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        Language
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        Log Out
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        Account Deletion
                    </p>
                </div>
            </div>
        </main>
        <LandingFooter />
        </>
      )
}
export default Setting;