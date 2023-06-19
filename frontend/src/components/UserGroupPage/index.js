import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMembershipThunk } from "../../store/membershipThunk";
import UserGroupComponent from "../UserGroupComponent";

function UserGroupPage() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    const membershipsGeneral = useSelector((state) => state.memberships?.membership)
    const [loading, setLoading] = useState(true);


    // console.log("membershipsGeneral: ", membershipsGeneral)

    // useEffect(() => {
    //     dispatch(allMembershipThunk(user.id))
    // }, [])

    useEffect(() => {
        const fetchMemberships = async () => {
          await dispatch(allMembershipThunk(user.id));
          setLoading(false);
        };

        fetchMemberships();
      }, [dispatch, user.id]);

      if (loading) {
        return <div>Loading...</div>;
      }


    return (
        <div>
            <div>
                Groups you manage
            </div>
            <div>
                Groups you're part of
                {membershipsGeneral && Object.values(membershipsGeneral).map(e =>
                <UserGroupComponent group={e}/>)}
            </div>
        </div>
    );
}

export default UserGroupPage;
