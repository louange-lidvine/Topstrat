import React from 'react'

function Preview() {
  return (
      <div className="border border-blue-default my-4 rounded-md mx-2 w-[75%] float-right p-4 font-medium ">
          <div className="flex flex-col  justify-center items-center gap-4 text-2xl ">
              <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                  untitled project
              </div>
              <div className="text-yellow-500 font-bold ">Preview</div>
              <div className="text-blue-default font-bold  ">
                  Strategic Plan for Rabbit Rearing Project
              </div>
          </div>
          <div>
              <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 ">
                      <h3 className="text-blue-default font-bold text-xl">
                          {" "}
                          Project Overview
                      </h3>
                      <p className="">
                          The Rabbit Rearing Project aims to establish a
                          sustainable and profitable rabbit farming operation.
                          Leveraging a team with extensive expertise in animal
                          husbandry, and access to suitable land, the project is
                          poised to tap into the local demand for high-quality
                          rabbit meat. While facing initial constraints in
                          capital and brand recognition, the project anticipates
                          capitalizing on a growing trend towards healthier
                          meats and potential for value-added products.
                          Government subsidies and export opportunities further
                          bolster the venture.
                      </p>
                  </div>
                  <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold"> Vision</h3>
                      <p>
                          "To create a sustainable and prosperous rabbit farming
                          community, providing economic empowerment and improved
                          food security"
                      </p>
                  </div>
                  <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold"> Mission</h3>
                      <p>
                          "Our mission is to implement best practices in rabbit
                          husbandry, provide comprehensive training, and
                          establish market linkages for the benefit of the
                          community"
                      </p>
                  </div>
              </div>
          </div>
          <div className="flex flex-col gap-4 ">
              <h2 className="text-xl font-bold text-blue-default">
                  SWOT ANALYSIS
              </h2>
              <div className="w-[100%]">
                  <table className="border border-collapse w-1/2  ">
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6  ">
                              Row 1, Col 1
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                              Row 1, Col 2
                          </td>
                      </tr>
                      <tr>
                          <td row-span="5">Left Column Row 1</td>

                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 3</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 4</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 5</td>
                          </tr>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 3, Col 1
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 3, Col 2
                          </td>
                      </tr>
                      <tr>
                          <td row-span="5">Left Column Row 1</td>

                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 3</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 4</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 5</td>
                          </tr>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 5, Col 1
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 5, Col 2
                          </td>
                      </tr>

                      <tr>
                          <td row-span="5">Left Column Row 1</td>

                          <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                              <td>Right Column Row 1, Cell 3</td>
                          </tr>
                          <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                              <td>Right Column Row 1, Cell 4</td>
                          </tr>
                          <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                              <td>Right Column Row 1, Cell 5</td>
                          </tr>
                      </tr>
                      <tr className="border-2 border-solid border-black p-[6px] text-left px-6">
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 8, Col 1
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Row 8, Col 2
                          </td>
                      </tr>
                      <tr>
                          <td row-span="5">Left Column Row 1</td>

                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 2</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 3</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 4</td>
                          </tr>
                          <tr>
                              <td>Right Column Row 1, Cell 5</td>
                          </tr>
                      </tr>
                  </table>
              </div>
          </div>
      </div>
  );
}

export default Preview