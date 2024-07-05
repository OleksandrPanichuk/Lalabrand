
export function formatUsername({firstName, lastName}: {firstName:string, lastName:string}) {
	return `${firstName} ${lastName.at(0)}.`
}