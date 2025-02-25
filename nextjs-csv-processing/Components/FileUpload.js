"use client";

import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState([]); // State to store parsed CSV data

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        setLoading(true);
        setMessage('');
        setParsedData([]); // Clear previous data

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${errorText}`);
            }

            const result = await response.json();
            setMessage(result.message || 'File processed successfully');

            // Update parsed CSV data
            if (result.data && result.data.length > 0) {
                setParsedData(result.data);
            }
        } catch (error) {
            setMessage('File upload failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold">Upload CSV File</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p className="text-gray-700">{message}</p>}

            {/* Show parsed data in a table */}
            {parsedData.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Parsed CSV Data:</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    {Object.keys(parsedData[0]).map((key, index) => (
                                        <th key={index} className="border border-gray-300 px-4 py-2">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50">
                                        {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
