import './UpgradeItem.css';

const UgradeItem = ({ upgrade, totalCookies, handlePurchaseCookie }) => {
  return (
    <>
      <li key={upgrade.id} className='upgrade'>
        <p>{upgrade.name}</p>
        <p>$C {upgrade.cost}</p>
        <p>+{upgrade.increase}</p>
        <button
          className='button'
          disabled={totalCookies < upgrade.cost}
          onClick={() => handlePurchaseCookie(upgrade)}
        >
          Buy
        </button>
      </li>
      <hr />
    </>
  );
};

export default UgradeItem;
