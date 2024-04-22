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
              <div className="w-[100%] flex justify-center items-center">
                  <table className="border border-collapse w-[80%]  ">
                      <tr className="text-blue-default">
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">
                              Strengths(S)
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                              Weaknesses(W)
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                              High Reproductive Rate
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                              {" "}
                              Sensitivity to Environmental Conditions
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Low Space Requirements
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Health Challenges
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Versatile Market Demand
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Limited Awaeness and Market Penetration
                          </td>
                      </tr>
                      <tr className="text-blue-default ">
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">
                              Opportunities (O)
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Threats (T)
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Trainings and Workkshops
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Market Price Volatility
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Local Partnerships
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Disease Outbreaks
                          </td>
                      </tr>
                      <tr>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              Market Expansion
                          </td>
                          <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                              competitive Market
                          </td>
                      </tr>
                  </table>
              </div>
              {/* <Link href="/signup">Sign Up</Link> */}
              <div className="bg-blue-default text-white  m-auto font-bold  rounded-md py-3 w-1/2">
                  <div className="flex  items-center justify-center ">next</div>
              </div>
          </div>
      </div>
  );
}

export default Preview