import { useRef } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Navbar from "../components/Navbar";
import { MdOutlinePets } from "react-icons/md";

const QrCodePage = () => {
  const qrRef = useRef();
  const { id } = useParams();

  const handleDownload = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr_code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center flex-grow text-[#324d27]">
        <div className="flex flex-col md:flex-row md:max-w-[60vw] justify-center items-center text-[#324d27] md:border-2 rounded-xl border-[#324d27] p-2 md:p-4 lg:p-8">
          <div className="w-full xl:w-[50%] md:p-6">
            <h1 className="heading text-xl flex gap-4 items-center">
              <MdOutlinePets className="text-8xl rotate-[-30deg] hover:scale-125 transition-all duration-300" />
              Here&apos;s Your QR Code for your furry friend!
            </h1>
            <p className="text-gray-700 mb-4">
              Attach this QR code to your pet&apos;s collar to ensure their
              safety and quick return if they ever get lost. This QR code can be
              scanned by anyone who finds your pet, providing them with your
              contact information and any other important details you choose to
              share.
            </p>
          </div>
          <div className="w-full md:w-[50%] flex flex-col items-center">
            <section
              ref={qrRef}
              className="w-[20rem] h-[20rem] p-12 rounded-full items-center justify-center flex flex-col"
            >
              <div className="relative">
                <img
                  src="/images/frame.svg"
                  alt="logo"
                  className="w-[120%] h-[120%] rounded-full -mt-2"
                />
                <QRCode
                  className="w-[7rem] h-[7rem] mt-5 absolute top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
                  // value={`${import.meta.env.VITE_CLIENT__URL}pet/${id}`}
                  value={`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/pet/${id}`}
                  viewBox={`0 0 300 300`}
                  fgColor="#324d27"
                  bgColor="transparent"
                  title="FURRY FRIEND ALLIANCE"
                  level="Q"
                />
              </div>
            </section>
            <button
              onClick={handleDownload}
              className="mt-4 text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodePage;
