import { DefaultMenu } from '../../component/default-menu(client)/DefaultMenu';
import NowToMidnight from "../../component/nowToMidnight";

export default function Home() {
  return (
    <>
      <section>
        <div>
          <NowToMidnight />
        </div>
        <div>
          <DefaultMenu />
        </div>
      </section>
    </>
  );
}
