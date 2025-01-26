import './UpgradeItem.css';
const UgradeItem = ({ upgrade, totalCookies, handlePurchaseCookie, count }) => {
  return (
    <>
      <li key={upgrade.id} className='upgrade'>
        <p>{count}</p>
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
