import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import { Import } from "../index";

function render(item)  {
	if (item.package) {
		return (
			<Import name={item.package}>
				{item.fn}
			</Import>
		);
	} else if (item.fn) {
		return item.fn();
	}
	return null;
}

export function Holy(props) {
	const [tabs, setTabs] = React.useState([{id: '1', title: 'One'}]);

	// TODO create a context so sub module can access to it.
	return (
		<Box d="flex" minH="100vh" flexDir="column">
			<Box>
				{render(props.header)}
			</Box>
			<Box d="flex" flex="1" flexDir={['column', 'row']}>
				<Box flexBasis={['auto', 64]}>
					{render(props.nav)}
				</Box>
				<Box flex="1" minW="0">
					<Tabs>
						<TabList>
							{tabs.map(tab => (<Tab key={tab.id}>{tab.title}</Tab>))}
						</TabList>

						<TabPanels>
							{tabs.map(tab => (
								<TabPanel key={tab.id}>
									{render(tab)}
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</Box>
				<Box flexBasis={['auto', 64]}>
					{render(props.right)}
				</Box>
			</Box>
			<Box>{render(props.footer)}</Box>
		</Box>
	);
}
