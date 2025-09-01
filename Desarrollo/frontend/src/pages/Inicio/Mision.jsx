import React from "react";

export default function Mision() {
  return (
    <section className="bg-[#f8f5ef] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-green-900 text-white rounded-lg shadow-md p-6 flex items-center gap-6">
          {/* Imagen/avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z" />
              </svg>
            </div>
          </div>

          {/* Texto */}
          <div>
            <h3 className="bg-black text-white px-3 py-1 rounded inline-block font-bold mb-4">
              Nuestra misión
            </h3>
            <p className="text-sm leading-relaxed text-gray-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing ivamus
              ullamcorper magna at lorem volutpat. Morbi interdum orci in dolor
              scelerisque, in venenatis mauris nec, bibendum sem. Ut metus
              sapien, posuere ut tempor eget, mollis in magna. Aliquam finibus
              urna vel placerat congue. Vivamus efficitur ultrices tincidunt.
              Donec hendrerit blandit eros in cursus. Phasellus egestas rutrum
              augue, id.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
