import React from "react";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles} from "react-icons/hi";
function MusicPage(){

    return (
        <div>
            <TopCategory
                home={"home"}
                text={"음악"}
                iconName={<HiOutlineSparkles />}
            />
        </div>
    );
}
export default MusicPage;