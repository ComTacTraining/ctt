import React, { useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  useEffect(() => {
    const listMembers = async () => {
      let apiName = "AdminQueries";
      let path = "/listUsersInGroup";
      let request = {
        queryStringParameters: {
          groupname: "Members",
          limit: 60,
          token: nextToken
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`
        }
      };
      const { _nextToken, ...rest } = await API.get(apiName, path, request);
      const _members = rest.Users.map(u => {
        let attributes = {
          sub: "",
          email: "",
          email_verified: false,
          phone_number: "",
          phone_number_verified: false
        };
        for (let a of u.Attributes) {
          attributes[a.Name] = a.Value;
        }
        return {
          id: attributes.sub,
          username: u.Username,
          email: attributes.email,
          emailVerified: attributes.email_verified,
          phoneNumber: attributes.phone_number,
          phoneNumberVerified: attributes.phone_number_verified,
          status: u.UserStatus,
          enabled: u.Enabled,
          created: u.UserCreatedDate,
          modified: u.LastModifiedDate
        };
      });
      setNextToken(_nextToken);
      setMembers(_members);
    };
    listMembers();
  }, [nextToken]);

  return (
    <div>
      <h1>Members</h1>
      <table>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Email Verified</th>
          <th>Phone NUmber</th>
          <th>Phone Number Verified</th>
          <th>Status</th>
          <th>Enabled</th>
          <th>Created</th>
          <th>Modified</th>
        </tr>
        {members.map(member => (
          <tr key={member.id}>
            <td></td>
            <td>{member.id}</td>
            <td>{member.username}</td>
            <td>{member.email}</td>
            <td>{member.emailVerified}</td>
            <td>{member.phoneNumber}</td>
            <td>{member.phoneNumberVerified}</td>
            <td>{member.status}</td>
            <td>{member.enabled}</td>
            <td>{member.created}</td>
            <td>{member.modified}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Member;
