import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';

const DonateDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (selectedDate) {
            // Navigate to confirmation page or perform further actions
            navigate('/donationconfirmed', {state: {selectedDate}});
        } else {
            alert('Please select a date.');
        }
    };

    return (
        <>
            <SearchHeader />
            <main className="flex justify-center items-center h-full bg-gray-100 py-10">
                <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="text-center mt-4">
                        <h1 className="text-3xl font-semibold text-center mb-6">Schedule Your Donation</h1>
                        <p className="text-gray-700 font-medium text-center mb-8">
                            Select a date for your donation.
                        </p>
                    </div>
                    <div className="flex justify-center items-center mb-8">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            minDate={new Date()}
                            className="rounded-md border border-gray-300 shadow-md"
                        />
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                        >
                            Confirm Date
                        </button>
                    </div>
                </div>
            </main>
        <Footer />
        </>
    );
}

export default DonateDatePicker;