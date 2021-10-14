import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import {Link} from "react-router-dom";

function EditPage(){
	return (
		<FrontLayout>
			<PageTitle title="수정" />
		</FrontLayout>
	)
};

export default EditPage;