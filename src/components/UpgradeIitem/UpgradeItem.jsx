const UgradeItem = ({ upgrade, totalCookies, handlePurchaseCookie }) => {
  return (
    <li key={upgrade.id}>
      <p>{upgrade.name}</p>
      <p>$C {upgrade.cost}</p>
      <p>+{upgrade.increase}</p>
      <button
        disabled={totalCookies < upgrade.cost}
        onClick={() => handlePurchaseCookie(upgrade)}
      >
        Buy
      </button>
    </li>
  );
};

export default UgradeItem;
