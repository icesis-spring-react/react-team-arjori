import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
      <div>
          <ul>
              <li>
                  <a className="m-5 font-medium text-blue-600 hover:underline" onClick={() => navigate("/directors")}>Directors</a>
              </li>
              <li>
                  <a className="m-5 font-medium text-blue-600 hover:underline" onClick={() => navigate("/films")}>Films</a>
              </li>
          </ul>
      </div>
    )
}
