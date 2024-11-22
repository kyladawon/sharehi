import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LandingFooter from '../components/LandingFooter';

const QuantityControl = ({ quantity, setQuantity }) => {
    return (
        <div className="flex items-center space-x-2 mt-2">
            <button
                onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                className="bg-gray-300 p-1 rounded-md text-base"
            >
                -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 p-1 rounded-md text-base"
            >
                +
            </button>
        </div>
    );
};


const getRandomImageUrl = () => `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;

const Donate1 = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [hiddenProducts, setHiddenProducts] = useState({});
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        setProfile({
            username: "Example Organization",
            orgcategory: "Charity",
            description: "We provide assistance to those in need.",
            address: "123 Charity St.",
            contactinfo: "contact@example.org",
        });
        setProducts([
            { id: 1, type: "Food", description: "Fresh produce", quantity: 10 },
            { id: 2, type: "Clothing", description: "Winter coats", quantity: 5 },
            { id: 3, type: "Toys", description: "Stuffed animals", quantity: 20 },
        ]);
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    const handleNextClick = () => {
        console.log("Quantities:", quantities);
    };

    const handleRemoveProduct = (id) => {
        setHiddenProducts({ ...hiddenProducts, [id]: true });
    };

    return (
        <>
            <Header />
            <main className="flex justify-center items-center h-full bg-gray-100 py-10">
                <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-md border border-gray-200">

                    {/* 1. "Select the product you’d like to donate" 구간 */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold mb-4 text-left">Select the product you’d like to donate</h1>
                    </div>

                    {/* 2. 제품 리스트 */}
                    <div className="grid grid-cols-1 gap-6">
                        {products.map((product, index) => (
                            <React.Fragment key={product.id}>
                                {/* Products 제목 (첫 번째 물품 위에만 출력) */}
                                {index === 0 && (
                                    <div className="mb-4">
                                        <h5 className="text-sm text-gray-500 uppercase font-semibold text-left">Products</h5>
                                    </div>
                                )}
                                {/* 제품 카드 */}
                                <div className="grid grid-cols-2 items-start gap-6">
                                    {/* 왼쪽: 제품 이미지 */}
                                    <img
                                        src={getRandomImageUrl()}
                                        alt={product.type}
                                        className="w-48 h-48 object-cover rounded-md"
                                    />
                                    {/* 오른쪽: 물품 이름, 수량 조절, X 버튼 */}
                                    {!hiddenProducts[product.id] && (
                                        <div className="flex flex-col w-full">
                                            {/* 물품 이름과 X 버튼 */}
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-medium text-lg">{product.type}</h4>
                                                <button
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="bg-white text-black text-[10px] px-1 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
                                                    >
                                                    X
                                                </button>

                                            </div>
                                            {/* 수량 조절 컴포넌트 */}
                                            <QuantityControl
                                                quantity={quantities[product.id] || 0}
                                                setQuantity={(newQuantity) =>
                                                    setQuantities({ ...quantities, [product.id]: newQuantity })
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* 3. Next 버튼 구간 */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleNextClick}
                            className="w-auto px-8 bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 text-lg"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </>
    );
};

export default Donate1;
